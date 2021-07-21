let endpoint = 'https://hacker-news.firebaseio.com/v0'
let res = await fetch(endpoint + '/topstories.json')
let data = await res.json()
let stories = document.querySelector('main')
let limit = Number(location.search.slice(1)) || 10

if (limit > data.length) limit = data.length

for (let i = 0; i < limit; i++) {
  let id = data[i]
  res = await fetch(`${endpoint}/item/${id}.json`)
  let story = await res.json()
  let time = new Date(story.time * 1000).toLocaleString()
  let div = document.createElement('div')
  let h2 = document.createElement('h2')

  let title = document.createElement('a')
  title.href = story.url
  title.target = '_blank'
  title.rel = 'noopener'
  title.textContent = story.title

  let description = document.createElement('p')
  description.textContent = `by ${story.by} at ${time}`

  let comments = document.createElement('a')
  comments.href = 'https://news.ycombinator.com/item?id=' + id
  comments.target = '_blank'
  comments.rel = 'noopener'
  comments.textContent = 'comments'

  div.append(h2)
  h2.append(title)
  div.append(description)
  div.append(comments)
  stories.append(div)
}
