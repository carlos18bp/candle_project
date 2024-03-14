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
            'image_url': blog.image.url if blog.image else '',
            'image_path': blog.image.path if blog.image else ''
        }
        blogs_serialized.append(blog_data)

    return json.dumps(blogs_serialized)