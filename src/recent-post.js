const mediumLogo =
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" x="390" y="-13" height="13" viewBox="0 0 1200 700">
    <path d="M589 296a295 295 0 1 1-589 0C0 133 132 0 294 0s295 133 295 296m323 0c0 154-66 279-148 279S617 450 617 296 683 17 764 17s148 125 148 279m132 0c0 138-24 250-52 250s-52-112-52-250 23-250 52-250 52 112 52 250" fill="black" />
</svg>`

const styleTag = `
  <style>
  .header {
      font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #343A40;
  }

  .log-title {
      font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #212529
  }

  .log-description {
      font-size: 12px;
      fill: #292929
  }

  .tag-item {
      font-size: 10px;
      fill: #292929;
  }

  .log-created {
      font-size: 10px;
      fill: #757575;
  }
  </style>
`

const createPostHeader = (username) => {
  return `
      <g data-testid="card-header" transform="translate(25, 35)">
      <g transform="translate(0, 0)">
          ${mediumLogo}
          <text x="0" y="0" class="header" data-testid="header">${username} Medium</text>
      </g>
  </g>
      `;
};

const createPostBody = (updateTime, title, content) => {
  return `
      <g data-testid="card-body" transform="translate(0, 40)">
      <svg data-testid="lang-items" x="25" width="400" height="60" viewBox="0 0 400 40">
          <g transform="translate(0, 0)">
              <text class="log-created" x="2" y="7">${updateTime}</text>
              <text data-testid="lang-name" x="2" y="25" class="log-title">${title}</text>
              <text ata-testid="lang-description" x="2" y="45" class="log-description">${content}</text>
          </g>
      </svg>
    </g>
`
}

const createPostFooter = (tags) => {
  return `
  <g data-testid="card-bottom" transform="translate(0, 40)">
  <svg data-testid="lang-items" x="25" width="124" viewBox="0 0 124 19">
      <g style="position: relative;">
          <rect width="40" height="19.5367" rx="9.76834" fill="#f2f2f2" />
          <text data-testid="lang-name" text-anchor="middle" x="20" y="13" class="tag-item">${tags}</text>
      </g>
  </svg>
</g>
`
}

function createPost(username, updateTime, title, content, tags) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="160" viewBox="0 0 450 160" fill="none">
    ${styleTag}
    <rect xmlns="http://www.w3.org/2000/svg" data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%"
        stroke="#e4e2e2" width="449" fill="#fffefe" stroke-opacity="1" />
    ${createPostHeader(username)}
    ${createPostBody(updateTime, title, content)}
    ${createPostFooter(tags)}
</svg>`
}


const createFile = (data) => {
  var fs = require('fs');
  fs.writeFile('./medium.svg', data, function (err) {
    if (err === null) {
      console.log('success');
    } else {
      console.log('fail');
    }
  });
}

module.exports = { createPost, createFile };