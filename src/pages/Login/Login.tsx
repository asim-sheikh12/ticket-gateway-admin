import { RootState } from '@/redux/Store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../redux/Reducer'

export const Login = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  console.log({ count })
  const dispatch = useDispatch()
  return (
    <>
      <div>Login Page...</div>
      <button aria-label='Increment value' onClick={() => dispatch(increment())}>
        Click Me !
      </button>
    </>
  )
}
