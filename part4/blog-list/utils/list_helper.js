const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog => {
        likes += blog.likes
    })

    return likes
}

const favoriteBlog = (blogs) => {
    let mostLikes = 0
    let favBlog 

    blogs.forEach(blog => {
        if(blog.likes > mostLikes) {
            mostLikes = blog.likes
            favBlog = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })

    return favBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}