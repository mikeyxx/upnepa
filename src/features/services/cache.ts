interface UserStatus {
  isFirstTimeLogin: boolean;
}

export const cacheUserStatus = (isFirstTimeLogin: UserStatus) => {
  localStorage.setItem("isFirstTimeLogin", JSON.stringify(isFirstTimeLogin));
};

export const getUserStatus = (): UserStatus => {
  return JSON.parse(localStorage.getItem("isFirstTimeLogin") || "{}");
};
