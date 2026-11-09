from src.repositories.fake_user_repository import FakeUserRepository
from src.services.user_service import UserService


def get_user_service() -> UserService:
    repository = FakeUserRepository()
    return UserService(repository)
