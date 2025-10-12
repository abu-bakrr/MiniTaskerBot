from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)
CORS(app)

# Database connection
def get_db_connection():
    # Use DATABASE_URL if available, otherwise build from individual vars
    database_url = os.getenv('DATABASE_URL')
    
    # Debug: print database connection info
    print(f"DEBUG: DATABASE_URL = {database_url if database_url else 'NOT SET'}")
    print(f"DEBUG: PGHOST = {os.getenv('PGHOST', 'NOT SET')}")
    print(f"DEBUG: PGDATABASE = {os.getenv('PGDATABASE', 'NOT SET')}")
    
    if database_url:
        # Add sslmode=require for Neon database
        if 'sslmode=' not in database_url:
            database_url = database_url + ('&' if '?' in database_url else '?') + 'sslmode=require'
        conn = psycopg2.connect(database_url, cursor_factory=RealDictCursor)
    else:
        # Build connection from individual PostgreSQL environment variables
        conn = psycopg2.connect(
            host=os.getenv('PGHOST'),
            port=os.getenv('PGPORT', '5432'),
            user=os.getenv('PGUSER'),
            password=os.getenv('PGPASSWORD'),
            database=os.getenv('PGDATABASE'),
            sslmode='require',
            cursor_factory=RealDictCursor
        )
    return conn

# Initialize database tables
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Create categories table if not exists
    cur.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            icon TEXT NOT NULL
        )
    ''')
    
    # Create products table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            description TEXT,
            price INTEGER NOT NULL,
            images TEXT[] NOT NULL,
            category_id VARCHAR REFERENCES categories(id)
        )
    ''')
    
    # Create users table if not exists
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    
    # Create favorites table (many-to-many: users <-> products)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS favorites (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
            product_id VARCHAR REFERENCES products(id) ON DELETE CASCADE,
            UNIQUE(user_id, product_id)
        )
    ''')
    
    conn.commit()
    cur.close()
    conn.close()

# API Routes

@app.route('/categories', methods=['GET'])
def get_categories():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM categories')
        categories = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/categories', methods=['POST'])
def create_category():
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO categories (name, icon) VALUES (%s, %s) RETURNING *',
            (data['name'], data['icon'])
        )
        category = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(category), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/products', methods=['GET'])
def get_products():
    try:
        category_id = request.args.get('category_id')
        conn = get_db_connection()
        cur = conn.cursor()
        
        if category_id:
            cur.execute('SELECT * FROM products WHERE category_id = %s', (category_id,))
        else:
            cur.execute('SELECT * FROM products')
        
        products = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/products', methods=['POST'])
def create_product():
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO products (name, description, price, images, category_id) VALUES (%s, %s, %s, %s, %s) RETURNING *',
            (data['name'], data.get('description'), data['price'], data['images'], data.get('category_id'))
        )
        product = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(product), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM products WHERE id = %s', (product_id,))
        product = cur.fetchone()
        cur.close()
        conn.close()
        
        if product:
            return jsonify(product)
        return jsonify({'error': 'Product not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/favorites/<user_id>', methods=['GET'])
def get_favorites(user_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            SELECT p.* FROM products p
            JOIN favorites f ON p.id = f.product_id
            WHERE f.user_id = %s
        ''', (user_id,))
        favorites = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(favorites)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/favorites', methods=['POST'])
def add_to_favorites():
    try:
        data = request.json
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO favorites (user_id, product_id) VALUES (%s, %s) ON CONFLICT (user_id, product_id) DO NOTHING RETURNING *',
            (data['user_id'], data['product_id'])
        )
        favorite = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(favorite), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/favorites/<user_id>/<product_id>', methods=['DELETE'])
def remove_from_favorites(user_id, product_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'DELETE FROM favorites WHERE user_id = %s AND product_id = %s',
            (user_id, product_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'message': 'Removed from favorites'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Tables are created by seed_db.py, no need to call init_db here
    # Flask API runs on port 5000
    # Vite dev server will run on 5173 during development
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
