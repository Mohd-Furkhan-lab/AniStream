def add_user(data):
    if data:
        name=data['name']
        password=data['password']
        email=data['email']
        return True

def verify_user(data):
    if data:
        name=data['name']
        password=data['password']
        return True