import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const dataSuiteApiUrl = `${baseUrl}/data/api/v1`;

const urls = {
  get: {
    list: `${dataSuiteApiUrl}/list/`,
    detail: `${dataSuiteApiUrl}/detail/`,
    featureDetail: `${dataSuiteApiUrl}/feature_detail/`,
  },
  post: {
    createDataSet: `${dataSuiteApiUrl}/create_data_set/`,
    updateFeatureProperties: `${dataSuiteApiUrl}/update_feature_properties/`,
  },
  delete: {
  },
};

// Add auth headers to ALL api requests
const api = axios.create({
  headers: { Authorization: `Token ${localStorage.getItem('userToken')}` },
});

const fileUploadHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// DataSuite GET requests
const list = () => api.get(urls.get.list);
const detail = dataSetId => api.get(`${urls.get.detail}${dataSetId}/`);
const featureDetail = featureId => api.get(`${urls.get.featureDetail}${featureId}/`);
// DataSuite POST requests
const createDataSet = formData => api.post(urls.post.createDataSet, formData, fileUploadHeaders);
const updateFeatureProperties = (openFeatureId, newFeatureProperties) =>
  api.post(urls.post.updateFeatureProperties, { openFeatureId, newFeatureProperties });

const tourService = {
  get: {
    list,
    detail,
    featureDetail,
  },
  post: {
    createDataSet,
    updateFeatureProperties,
  },
  delete: {
  },
};

export default tourService;
