from typing import List, Optional

from src.models.user import User
from src.repositories.interfaces.user_repository_interface import UserRepositoryInterface


class UserService:
    def __init__(self, user_repository: UserRepositoryInterface):
        self._user_repository = user_repository

    def list_users(self) -> List[User]:
        return self._user_repository.get_all()

    def get_user(self, user_id: str) -> Optional[User]:
        return self._user_repository.get_by_id(user_id)

    def create_user(self, user: User) -> User:
        return self._user_repository.create(user)
