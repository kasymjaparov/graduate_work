import cloudinary.api
import cloudinary.uploader


def delete_from_cloudinary(mapper, connection, instance, attr_name):
    attr_value = getattr(instance, attr_name)
    if attr_value:
        public_id = attr_value.split("/")[-1].split(".")[0]
        response = cloudinary.api.delete_resources(public_id)
        print(f"{attr_name.capitalize()} is deleted", response)
    else:
        print(f"{attr_name.capitalize()} is not exists")


def delete_file_from_cloudinary(mapper, connection, instance):
    delete_from_cloudinary(mapper, connection, instance, 'file')


def delete_doc_file_from_cloudinary(mapper, connection, instance):
    delete_from_cloudinary(mapper, connection, instance, 'doc_file')


def delete_image_from_cloudinary(mapper, connection, instance):
    delete_from_cloudinary(mapper, connection, instance, 'image')


def delete_doc_text_from_cloudinary(mapper, connection, instance):
    delete_from_cloudinary(mapper, connection, instance, 'doc_text')
