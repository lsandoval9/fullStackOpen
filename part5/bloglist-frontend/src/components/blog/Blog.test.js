import { render } from '@testing-library/react'
import Blog from './Blog'
import { fireEvent } from '@testing-library/react'

import blogsService from '../../services/blogsService'

import { toHaveStyle } from '@testing-library/jest-dom/matchers'
import axios from 'axios'


expect.extend({ toHaveStyle })

jest.mock('../../services/blogsService', () => ({
  updateBlog: jest.fn()
}))

describe('Blog component', () => {

  let testBlog

  beforeEach(() => {

    testBlog = {
      author: 'Arto',
      likes: 256,
      title: 'Testing react apps',
      url: 'https://fullstackopen.com/en/part5/'

    }

  })

  test('should render only its author and title by default', async () => {

    const component = render(
      <Blog blog={testBlog}/>
    )

    const element = component.getByText(
      'Testing react apps Arto'
    )
    expect(element).toBeDefined()

    const detailsElement = component.container.querySelector(
      '.details'
    )

    expect(detailsElement).toHaveStyle('display: none')

  })


  test('should show the details when the details button is clicked', async () => {



    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={testBlog}  fetchBlogs={mockHandler}/>
    )

    const button = component.getByText('show details')

    fireEvent.click(button)

    const details = component.container.querySelector('#details')



    expect(details).toBeDefined()

    expect(details).toHaveStyle('display:  block')

    expect(details.querySelector('#url')).toBeDefined()
    expect(details.querySelector('#likes')).toBeDefined()

  })

  test('should call fetchBlogs twice when the like button is called twice', async () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={testBlog}  fetchBlogs={mockHandler}/>
    )

    const detailsButton = component.getByText('show details')

    fireEvent.click(detailsButton)

    const likeButton = component.getByText('Like')

    await fireEvent.click(likeButton)

    await fireEvent.click(likeButton)

    expect(blogsService.updateBlog.mock.calls).toHaveLength(2)

  })

  afterEach(() => {
    jest.clearAllMocks()
  })

})