import psycopg2
from psycopg2.extras import RealDictCursor
import os

def seed_database():
    # Debug: print all environment variables starting with PG or DATABASE
    print(f"=== Environment Variables ===")
    for key in sorted(os.environ.keys()):
        if key.startswith('PG') or key.startswith('DATABASE') or key.startswith('REPL'):
            print(f"{key} = {os.environ[key][:50] if len(os.environ[key]) > 50 else os.environ[key]}")
    print(f"=== End Environment Variables ===")
    
    # Use DATABASE_URL if available, otherwise build from individual vars
    database_url = os.getenv('DATABASE_URL')
    
    print(f"Connecting to database...")
    print(f"DATABASE_URL exists: {'Yes' if database_url else 'No'}")
    
    if database_url:
        # Add sslmode=require for Neon database
        if 'sslmode=' not in database_url:
            database_url = database_url + ('&' if '?' in database_url else '?') + 'sslmode=require'
        conn = psycopg2.connect(database_url, cursor_factory=RealDictCursor)
    else:
        # Build connection from individual PostgreSQL environment variables
        pghost = os.getenv('PGHOST')
        print(f"PGHOST: {pghost if pghost else 'Not set'}")
        
        conn = psycopg2.connect(
            host=pghost,
            port=os.getenv('PGPORT', '5432'),
            user=os.getenv('PGUSER'),
            password=os.getenv('PGPASSWORD'),
            database=os.getenv('PGDATABASE'),
            sslmode='require',
            cursor_factory=RealDictCursor
        )
    cur = conn.cursor()
    
    # Create tables if they don't exist
    cur.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            icon TEXT NOT NULL
        )
    ''')
    
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
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            telegram_id BIGINT UNIQUE,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            password TEXT
        )
    ''')
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS favorites (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
            product_id VARCHAR REFERENCES products(id) ON DELETE CASCADE,
            UNIQUE(user_id, product_id)
        )
    ''')
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS cart (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
            product_id VARCHAR REFERENCES products(id) ON DELETE CASCADE,
            quantity INTEGER NOT NULL DEFAULT 1,
            UNIQUE(user_id, product_id)
        )
    ''')
    
    conn.commit()
    
    # Check if categories exist
    cur.execute('SELECT COUNT(*) as count FROM categories')
    result = cur.fetchone()
    
    if result and result['count'] == 0:
        print("Добавление категорий...")
        categories = [
            ('Розы', '🌹'),
            ('Тюльпаны', '🌷'),
            ('Пионы', '🏵️'),
            ('Букеты', '💐'),
        ]
        
        category_ids = {}
        for name, icon in categories:
            cur.execute(
                'INSERT INTO categories (name, icon) VALUES (%s, %s) RETURNING id',
                (name, icon)
            )
            result = cur.fetchone()
            if result:
                category_ids[name] = result['id']
        
        conn.commit()
        print(f"Добавлено {len(categories)} категорий")
    else:
        print("База данных уже содержит данные")
    
    cur.close()
    conn.close()
    print("Готово!")

if __name__ == '__main__':
    seed_database()
