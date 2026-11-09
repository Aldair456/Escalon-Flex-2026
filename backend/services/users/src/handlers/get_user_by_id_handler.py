from dataclasses import asdict

from src.utils.container import get_user_service
from src.utils.response import build_response


def lambda_handler(event, context):
    user_id = event["pathParameters"]["id"]
    user_service = get_user_service()
    user = user_service.get_user(user_id)

    if user is None:
        return build_response(404, {"message": "User not found"})

    return build_response(200, asdict(user))
