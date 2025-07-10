const CONFIG = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "https://upnepaserver.online/api/v1"
      : // "http://localhost:5005/api/v1"
        "https://upnepaserver.online/api/v1",
};

export default CONFIG;
