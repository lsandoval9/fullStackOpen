import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'

import { toHaveStyle } from '@testing-library/jest-dom/matchers'
import axios from 'axios'
import AddNewBlog from './AddNewBlog'
import blogsService from '../../services/blogsService'

expect.extend({ toHaveStyle })

jest.mock('../../services/blogsService', () => ({
  createBlog: jest.fn().mockReturnValue({ status: 201 })
}))

describe('AddNewBlog component', () => {

  test('should call the event handled with the rigth details', async () => {
    const mockHandlerFetch = jest.fn()
    const mockHandlerToggleNotification = jest.fn()

    const component = render(
      <AddNewBlog
        fetchBlogs={mockHandlerFetch}
        toggleNotification={mockHandlerToggleNotification}
      />
    )



    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, { target: { value: 'Testing react components - FullStackOpen' } })
    fireEvent.change(author, { target: { value: 'lsandoval9' } })
    fireEvent.change(url,
      { target: { value: 'https://fullstackopen.com/en/part5/testing_react_apps' } })




    const submitForm = component.container.querySelector('#add-new-blog-form')

    await fireEvent.submit(submitForm)

    expect(blogsService.createBlog.mock.calls).toHaveLength(1)

    expect(blogsService.createBlog.mock.calls[0]).toEqual([
      {
        title: 'Testing react components - FullStackOpen',
        author: 'lsandoval9',
        url: 'https://fullstackopen.com/en/part5/testing_react_apps'
      },
      { headers: { Authorization: 'Bearer null' } }
    ])
  })


  afterEach(() => {
    jest.clearAllMocks()
  })
})
