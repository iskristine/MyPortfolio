
window.addEventListener('DOMContentLoaded', () => {
  fetch('data.xml')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
      renderProfile(data);
      renderSocialLinks(data);
      renderProjects(data);
      renderSkillsTalents(data);
      renderOrganizations(data);
      renderServices(data);
      renderTestimonials(data);
      renderContact(data);
    })
    .catch(e => console.error("Error loading XML:", e));
});

function getTextContent(xml, selector) {
  const el = xml.querySelector(selector);
  return el ? el.textContent : '';
}

function renderProfile(xml) {
  document.getElementById('fullname').textContent = getTextContent(xml, 'fullname');
  document.getElementById('tagline').textContent = getTextContent(xml, 'tagline');
  document.getElementById('location').textContent = getTextContent(xml, 'location');
  const photo = xml.querySelector('photo');
  if(photo && photo.textContent) {
    document.getElementById('profile-photo').src = photo.textContent;
  }
}

function getSocialIcon(platform) {
  const icons = {
    Facebook: "fab fa-facebook-f",
    LinkedIn: "fab fa-linkedin-in",
    GitHub: "fab fa-github",
    Instagram: "fab fa-instagram"
  };
  return icons[platform] || "fas fa-link";
}

function renderSocialLinks(xml) {
  const container = document.getElementById('social-links');
  container.innerHTML = '';
  const socials = xml.querySelectorAll('social > link');

  socials.forEach(link => {
    const url = link.textContent;
    const name = link.getAttribute('name');
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute("aria-label", name);

    const icon = document.createElement('i');
    icon.className = getSocialIcon(name);

    a.appendChild(icon);
    container.appendChild(a);
  });
}

function renderProjects(xml) {
  const container = document.getElementById('projects');
  container.innerHTML = '';
  const projects = xml.querySelectorAll('projects > project');
  projects.forEach(proj => {
    const card = document.createElement('div');
    card.classList.add('project-card');

    const imgSrc = proj.querySelector('image')?.textContent || '';
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = proj.querySelector('title')?.textContent || 'Project Image';
    img.classList.add('project-image');

    const content = document.createElement('div');
    content.classList.add('project-content');

    const title = document.createElement('h3');
    title.textContent = proj.querySelector('title')?.textContent || '';

    const desc = document.createElement('p');
    desc.textContent = proj.querySelector('description')?.textContent || '';

    const linkUrl = proj.querySelector('url')?.textContent || '';
    const link = document.createElement('a');
    link.href = linkUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = "View Project";
    link.classList.add('project-link');

    content.appendChild(title);
    content.appendChild(desc);
    if(linkUrl) content.appendChild(link);

    card.appendChild(img);
    card.appendChild(content);

    container.appendChild(card);
  });
}

function renderSkillsTalents(xml) {
  const skillsList = document.getElementById('skills-list');
  const talentsList = document.getElementById('talents-list');
  skillsList.innerHTML = '';
  talentsList.innerHTML = '';

  xml.querySelectorAll('skills > skill').forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill.textContent;
    skillsList.appendChild(li);
  });

  xml.querySelectorAll('talents > talent').forEach(talent => {
    const li = document.createElement('li');
    li.textContent = talent.textContent;
    talentsList.appendChild(li);
  });
}

function renderOrganizations(xml) {
  const orgList = document.getElementById('organizations-list');
  orgList.innerHTML = '';
  xml.querySelectorAll('organizations > organization').forEach(org => {
    const li = document.createElement('li');
    li.classList.add('organization-item');
    li.innerHTML = `
      <span class="org-name">${org.querySelector('name')?.textContent || ''}</span> - 
      <span class="org-role">${org.querySelector('role')?.textContent || ''}</span> 
      <span class="org-years">(${org.querySelector('years')?.textContent || ''})</span>
    `;
    orgList.appendChild(li);
  });
}

function renderServices(xml) {
  const container = document.getElementById('services-list');
  container.innerHTML = '';
  xml.querySelectorAll('services > service').forEach(service => {
    const div = document.createElement('div');
    div.classList.add('service-item');
    div.innerHTML = `<h3>${service.querySelector('title')?.textContent || ''}</h3>
                     <p>${service.querySelector('description')?.textContent || ''}</p>`;
    container.appendChild(div);
  });
}

function renderTestimonials(xml) {
  const container = document.getElementById('testimonials-list');
  container.innerHTML = '';
  xml.querySelectorAll('testimonials > testimonial').forEach(test => {
    const text = test.querySelector('text')?.textContent || '';
    const author = test.querySelector('author')?.textContent || '';
    const relationship = test.querySelector('relationship')?.textContent || '';

    const div = document.createElement('div');
    div.classList.add('testimonial-item');
    
    div.innerHTML = `
      <p class="testimonial-text">"${text}"</p>
      <p class="testimonial-author">
        – ${author}${relationship ? `, <span class="testimonial-relationship">${relationship}</span>` : ''}
      </p>
    `;

    container.appendChild(div);
  });
}


function renderContact(xml) {
  document.getElementById('email').textContent = getTextContent(xml, 'contact > email');
  document.getElementById('email').href = `mailto:${getTextContent(xml, 'contact > email')}`;
  document.getElementById('phone').textContent = getTextContent(xml, 'contact > phone');
  document.getElementById('location-contact').textContent = getTextContent(xml, 'contact > location');
}
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
// Toggle navbar for mobile
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('active');
});
const photoContainer = document.querySelector('.profile-photo-container');

if (photoContainer) {
  photoContainer.addEventListener('mouseenter', () => {
    photoContainer.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    photoContainer.style.transform = 'scale(1.1)';
    photoContainer.style.opacity = '0.9';
  });

  photoContainer.addEventListener('mouseleave', () => {
    photoContainer.style.transform = 'scale(1)';
    photoContainer.style.opacity = '1';
  });
}


// Fade-in sections when they enter viewport
const sections = document.querySelectorAll('.section, .header');

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function onScroll() {
  sections.forEach(section => {
    if (isInViewport(section)) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);
