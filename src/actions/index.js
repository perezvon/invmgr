import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  ADD_INVOICE
} from './types'

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product
})

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product
})
