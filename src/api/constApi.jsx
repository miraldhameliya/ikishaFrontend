// Auth endpoints
export const LOGIN = '/admin/login';
export const FORGOT_PASSWORD = '/admin/profile/forgotpassword';
export const RESET_PASSWORD = '/admin/profile/reset-password';

// Profile endpoints
// export const GET_PROFILE = '/admin/profile';
// export const UPDATE_PROFILE = '/admin/profile/update';

// Dashboard endpoints
export const GET_DASHBOARD_STATS = '/admin/dashboard/stats';
export const DIMOND_SHAPE = `/admin/diamondshape/create`;
export const DIAMOND_SHAPE_UPDATE = `/admin/diamondshape/update`;
export const DIAMOND_SHAPE_LIST = `/admin/diamondshape/`;
export const DIAMOND_SHAPE_STATUS_UPDATE = '/admin/diamondshape/changestatus';
export const ALLWOP_SHAPE = '/admin/diamondshape/?search='

export const SIZE_LIST = '/admin/size';
export const SIZE_CREATE = `/admin/size/create`
export const SIZE_UPDATE = `/admin/size/update`
export const SIZE_STATUS_UPDATE = '/admin/size/changestatus';
export const ALLWOP_SIZE = '/admin/size/?search='

export const METAL_TYPE_CREATE = '/admin/metaltypes/create';
export const METAL_TYPE_LIST = '/admin/metaltypes';
export const METAL_TYPE_UPDATE = '/admin/metaltypes/update';
export const METAL_TYPE_STATUS_UPDATE = '/admin/metaltypes/changestatus';
export const ALLWOP_METAL = '/admin/metaltypes/?search='

export const DIAMOND_CLARITY_LIST = '/admin/diamondclarities/';
export const DIAMOND_CLARITY_CREATE = '/admin/diamondclarities/create';
export const DIAMOND_CLARITY_UPDATE = '/admin/diamondclarities/update';
export const DIAMOND_STATUS_UPDATE = '/admin/diamondclarities/changestatus'
export const ALLWOP_CLARITY = '/admin/diamondclarities/?search='

export const CATEGORY_LIST = '/admin/categories/';
export const CATEGORY_CREATE = '/admin/categories/create';
export const CATEGORY_UPDATE = '/admin/categories/update';
export const CATEGORY_STATUS_UPDATE = '/admin/categories/changestatus';
export const ALL_WOP = '/admin/categories/?search='


export const DIMOND_TYPE = `/admin/diamondtype/create`;
export const DIAMOND_TYPE_UPDATE = `/admin/diamondtype/update`;
export const DIAMOND_TYPE_LIST = `/admin/diamondtype/`;
export const DIAMOND_TYPE_STATUS_UPDATE = '/admin/diamondtype/changestatus';
export const ALLWOP_TYPE = '/admin/diamondtype/?search='

export const PRODUCT_LIST = '/admin/products';
export const ADD_PRODUCT_LIST = '/admin/products/create'
export const UPDATE_PRODUCT_LIST = '/admin/product/update';
export const VIEW_PRODUCT_LIST = '/admin/product/view';
export const ALLWOP = '/admin/products/?search='
export const VIEW_ONE_PRODUCT = '/admin/products/getone?productId=&diamondtypeId='
export const PRODUCT_DETAIL = '/admin/products/getone';
export const UPLOAD_IMAGES = '/admin/products/image';
