const API_BASE_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (blogId) {
        fetchBlogDetails(blogId);
    } else {
        fetchLatestBlog();
    }

    fetchRecentPosts();
});

async function fetchBlogDetails(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
        const blog = await res.json();
        updatePageContent(blog);
    } catch (err) {
        console.error('Error fetching blog details:', err);
    }
}

async function fetchLatestBlog() {
    try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const blogs = await res.json();
        if (blogs.length > 0) {
            updatePageContent(blogs[0]);
        }
    } catch (err) {
        console.error('Error fetching latest blog:', err);
    }
}

function updatePageContent(blog) {
    document.title = `${blog.title} | LockHive Security`;
    document.getElementById('blog-main-title').innerText = blog.title;
    document.getElementById('breadcrumb-current').innerText = blog.title;
    document.getElementById('blog-date').innerText = new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    }).toUpperCase();
    
    if (blog.image) {
        document.getElementById('blog-featured-img').src = blog.image;
    }

    // Assuming content might have HTML or we treat it as text
    const contentBody = document.getElementById('blog-content-body');
    // We can preserve some structure or just wrap in paragraphs
    // For this demonstration, we'll just update the first paragraph and keep the rest of the template
    contentBody.querySelector('p').innerText = blog.content;
}

async function fetchRecentPosts() {
    try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const blogs = await res.json();
        const recentList = document.getElementById('recent-posts-list');
        
        // Take top 4 recent posts
        recentList.innerHTML = blogs.slice(0, 4).map(blog => `
            <div class="post-item">
                <img src="${blog.image || 'https://via.placeholder.com/80'}" alt="${blog.title}">
                <div class="post-info">
                    <h4><a href="?id=${blog._id}" style="color: white; text-decoration: none;">${blog.title}</a></h4>
                    <span><i class="far fa-calendar"></i> ${new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error fetching recent posts:', err);
    }
}

// Handle comment submission (mock)
document.querySelector('.comment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your comment! It will be reviewed by our team.');
    e.target.reset();
});
