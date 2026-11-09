import json
import uuid
from dataclasses import asdict

from src.models.user import User
from src.utils.container import get_user_service
from src.utils.response import build_response


def lambda_handler(event, context):
    body = json.loads(event.get("body") or "{}")
    user = User(id=str(uuid.uuid4()), name=body.get("name"), email=body.get("email"))

    user_service = get_user_service()
    created_user = user_service.create_user(user)

    return build_response(201, asdict(created_user))
