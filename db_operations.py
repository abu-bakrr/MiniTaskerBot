import psycopg2
from psycopg2.extras import RealDictCursor
import os


def get_db_connection():
    """Создает подключение к базе данных"""
    database_url = os.getenv('DATABASE_URL')
    
    if database_url:
        if 'sslmode=' not in database_url:
            database_url = database_url + ('&' if '?' in database_url else '?') + 'sslmode=require'
        conn = psycopg2.connect(database_url, cursor_factory=RealDictCursor)
    else:
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


def add_product(name, description, price, images, category_id=None):
    """
    Добавляет новый товар в базу данных
    
    Параметры:
        name (str): Название товара
        description (str): Описание товара
        price (int): Цена товара в копейках
        images (list): Массив URL изображений
        category_id (str, optional): ID категории
    
    Возвращает:
        dict: Словарь с данными созданного товара или None в случае ошибки
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO products (name, description, price, images, category_id) VALUES (%s, %s, %s, %s, %s) RETURNING *',
            (name, description, price, images, category_id)
        )
        product = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return product
    except Exception as e:
        print(f"Ошибка при добавлении товара: {e}")
        return None


def delete_product(product_id):
    """
    Удаляет товар из базы данных
    
    Параметры:
        product_id (str): ID товара для удаления
    
    Возвращает:
        bool: True если товар удален, False в случае ошибки
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM products WHERE id = %s', (product_id,))
        deleted_count = cur.rowcount
        conn.commit()
        cur.close()
        conn.close()
        return deleted_count > 0
    except Exception as e:
        print(f"Ошибка при удалении товара: {e}")
        return False


def add_category(name, icon):
    """
    Добавляет новую категорию в базу данных
    
    Параметры:
        name (str): Название категории
        icon (str): Иконка категории (эмодзи или текст)
    
    Возвращает:
        dict: Словарь с данными созданной категории или None в случае ошибки
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO categories (name, icon) VALUES (%s, %s) RETURNING *',
            (name, icon)
        )
        category = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return category
    except Exception as e:
        print(f"Ошибка при добавлении категории: {e}")
        return None


def delete_category(category_id):
    """
    Удаляет категорию из базы данных
    
    Параметры:
        category_id (str): ID категории для удаления
    
    Возвращает:
        bool: True если категория удалена, False в случае ошибки
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM categories WHERE id = %s', (category_id,))
        deleted_count = cur.rowcount
        conn.commit()
        cur.close()
        conn.close()
        return deleted_count > 0
    except Exception as e:
        print(f"Ошибка при удалении категории: {e}")
        return False


# Пример использования функций
if __name__ == "__main__":
    # Добавление категории
    new_category = add_category("Орхидеи", "🌸")
    if new_category:
        print(f"Категория добавлена: {new_category}")
        
        # Добавление товара
        new_product = add_product(
            name="Белая орхидея",
            description="Элегантная белая орхидея в горшке",
            price=250000,
            images=["https://example.com/orchid1.jpg", "https://example.com/orchid2.jpg"],
            category_id=new_category['id']
        )
        if new_product:
            print(f"Товар добавлен: {new_product}")
            
            # Удаление товара
            if delete_product(new_product['id']):
                print(f"Товар удален: {new_product['id']}")
        
        # Удаление категории
        if delete_category(new_category['id']):
            print(f"Категория удалена: {new_category['id']}")
