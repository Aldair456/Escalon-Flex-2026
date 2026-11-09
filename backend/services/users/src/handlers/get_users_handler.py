from dataclasses import asdict

from src.utils.container import get_user_service
from src.utils.response import build_response


def lambda_handler(event, context):
    user_service = get_user_service()
    users = user_service.list_users()
    return build_response(200, [asdict(user) for user in users])
