const Blog = require('../models/blog')

const initialBlog = [
    {
        title: "Traveling Blog",
        author: "Anton Ptushkin",
        url: "www.whatever.com",
        likes: 100,
        id: "614de9df5cdf86f85adaf299"
    },
    {
      title: "Bulldog Blog",
      author: "Garik Harlamov",
      url: "www.garikharlamov.com",
      likes: 1123124,
      id: "714de9df5jdf16f65adaf100"
    }, 
    {
      title: "Foodies",
      author: "Foodie Doodie",
      url: "www.foodood.com",
      likes: 1123124,
      id: "164da9df5jdf16f65adaf100"
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
        title: "test",
        author: "test",
        url: "test",
        likes: 100,
    })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlog, nonExistingId, blogsInDb
}