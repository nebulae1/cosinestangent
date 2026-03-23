export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date) {
  if (!date) return '';
  
  let dateObj;
  
  // If it's a string, parse YYYY-MM-DD format
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-');
    if (year && month && day) {
      dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      return date; // Return original if format is wrong
    }
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    // Unexpected type, return string representation
    return String(date);
  }
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return String(date);
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {
  // Ensure posts is an array
  if (!Array.isArray(posts)) {
    console.error('formatBlogPosts received non-array posts:', posts);
    return [];
  }

  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post)

    return acc;
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}