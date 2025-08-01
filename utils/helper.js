const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  ERROR: 500,
};

const model_name = {
  PRODUCT: "products",
  RULE: "rules",
  CART: "carts",
  USER: "users",
  CATEGORY: "categories",
  SUB_CATEGORY: "sub_categories",
};

const response_msg = {
  fetchALL: "fetch all data.",
  create: "created data successfully.",
  notFound: "Data not found",
  invalidCredentials: "Invalid credentials",
  loginSuccess: "Login successfully",
  tokenExpired: "Token is expired or Invalid",
  accountInActivated: "Your account has been deactivated by the administrator.",
  emailIsExists: "Email is already exists",
  fetchSuccessfully: "Fetched successfully",
  fetch_success: "Fetched successfully",
  update_success: "Updated successfully",
  delete_success: "Deleted successfully",
  signupSuccess: "Sign up successfully",
  headerMissing: "Header is missing",
  invalidToken: "Invalid Token",
  canNotFindCategory: "Can not find category data",
  resetCart: "Reset cart successfully",
  cartAlreadyExist: "Cart already exists. please update cart !",
  alreadyExist: "Already exists",
  verifiedSuccess: "Verified successfully",
};

const categoryIds = [
  "category-1",
  "category-2",
  "category-3",
  "category-4",
  "category-5",
];

const subCategoryIds = [
  "sub-category-1",
  "sub-category-2",
  "sub-category-3",
  "sub-category-4",
  "sub-category-5",
  "sub-category-6",
  "sub-category-7",
  "sub-category-8",
  "sub-category-9",
  "sub-category-10",
  "sub-category-11",
  "sub-category-12",
  "sub-category-13",
  "sub-category-14",
  "sub-category-15",
  "sub-category-16",
  "sub-category-17",
  "sub-category-18",
  "sub-category-19",
];

module.exports = {
  HttpStatus,
  model_name,
  response_msg,
  categoryIds,
  subCategoryIds,
};
