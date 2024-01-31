import json

def blog_serializer(blogs):
    """
    Blog serializer.
    """
    blogs_serialized = []

    for blog in blogs:
        blog_data = {
            'id': blog.id,
            'title': blog.title,
            'description': blog.description,
            'category': blog.category,
            'publication_date': blog.publication_date.strftime('%Y-%m-%d'),
            'image_url': blog.image.url,
            'image_path': blog.image.path
        }
        blogs_serialized.append(blog_data)

    return json.dumps(blogs_serialized)