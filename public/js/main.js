const portfolio = window.portfolioData || {};
const profile = portfolio.profile || {};
const skills = portfolio.skills || {};
const projects = portfolio.projects || [];
const experience = portfolio.experience || [];
const achievements = portfolio.achievements || [];
const currentFocus = portfolio.currentFocus || {};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

function setResumeState() {
  const resumeLink = document.getElementById("resume-link");
  if (!resumeLink) return;

  if (profile.resumeUrl) {
    resumeLink.href = profile.resumeUrl;
    resumeLink.setAttribute(
      "download",
      `${profile.name || "Portfolio"}-Resume`.replace(/\s+/g, "-"),
    );
    resumeLink.textContent = profile.resumeLabel || "Resume";
    resumeLink.setAttribute("aria-label", "Download resume");
  } else {
    resumeLink.href = "#";
    resumeLink.textContent = "Resume unavailable";
    resumeLink.setAttribute("aria-disabled", "true");
    resumeLink.addEventListener("click", (event) => event.preventDefault());
  }
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  if (!Object.values(skills).some((items) => items.length)) {
    container.appendChild(
      createElement(
        "p",
        "portfolio-empty",
        "Skills and interests will be added here.",
      ),
    );
    return;
  }

  const skillSections = [
    { title: "Programming Languages", items: skills.languages || [] },
    { title: "Frontend Development", items: skills.frontend || [] },
    { title: "Backend Development", items: skills.backend || [] },
    { title: "AI & ML", items: skills.ai || [] },
    { title: "Databases & Infrastructure", items: skills.infrastructure || [] },
  ];

  skillSections.forEach((group) => {
    const section = createElement("div", "skill-group");
    const label = createElement("div", "skill-group-label", group.title);
    const pills = createElement("div", "skills-grid-inline");

    group.items.forEach((item) => {
      const pill = createElement("span", "skill-pill", item.name);
      pill.setAttribute("data-description", item.description || "");
      pills.appendChild(pill);
    });

    section.appendChild(label);
    section.appendChild(pills);
    container.appendChild(section);
  });
}

function renderInterests() {
  const container = document.getElementById("interest-list");
  if (!container) return;

  if (!(skills.interests || []).length) {
    container.appendChild(
      createElement("li", "", "Interests will be added here."),
    );
    return;
  }

  (skills.interests || []).forEach((item) => {
    const li = createElement("li", "", item);
    container.appendChild(li);
  });
}

function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  if (!projects.length) {
    container.appendChild(
      createElement(
        "p",
        "portfolio-empty",
        "Selected projects will be added here.",
      ),
    );
    return;
  }

  projects.forEach((project) => {
    const card = createElement("article", "project-card");
    const visual = createElement("div", "project-visual");

    if (project.image) {
      const img = document.createElement("img");
      img.src = project.image;
      img.alt = `${project.name} project preview`;
      img.className = "project-image";
      visual.appendChild(img);
    } else {
      const ui = createElement("div", "mini-ui");

      for (let i = 0; i < 4; i += 1) {
        ui.appendChild(createElement("span", "bar"));
      }

      visual.appendChild(ui);
    }

    const copy = createElement("div", "project-copy");
    const meta = createElement(
      "p",
      "project-meta",
      project.category || "Project",
    );
    const title = createElement("h3", "", project.name);
    const description = createElement("p", "", project.description || "");
    const tags = createElement("div", "project-tags");
    (project.tech || []).forEach((tag) => {
      tags.appendChild(createElement("span", "", tag));
    });

    const actions = createElement("div", "project-actions");
    if (project.githubUrl) {
      const githubLink = createElement("a", "project-link", "GitHub");
      githubLink.href = project.githubUrl;
      githubLink.target = "_blank";
      githubLink.rel = "noreferrer";
      actions.appendChild(githubLink);
    }

    if (project.liveUrl) {
      const liveLink = createElement("a", "project-link", "Live Demo");
      liveLink.href = project.liveUrl;
      liveLink.target = "_blank";
      liveLink.rel = "noreferrer";
      actions.appendChild(liveLink);
    }

    const caseStudy = createElement("a", "project-link", "Case study");
    caseStudy.href = "#contact";
    actions.appendChild(caseStudy);

    copy.appendChild(meta);
    copy.appendChild(title);
    copy.appendChild(description);
    copy.appendChild(tags);
    copy.appendChild(actions);
    card.appendChild(visual);
    card.appendChild(copy);
    container.appendChild(card);
  });
}

function renderExperience() {
  const container = document.getElementById("experience-list");
  if (!container) return;

  if (!experience.length) {
    container.appendChild(
      createElement("p", "portfolio-empty", "Experience will be added here."),
    );
    return;
  }

  experience.forEach((item) => {
    const timelineItem = createElement("div", "timeline-item");
    const marker = createElement("div", "timeline-marker");
    const card = createElement("div", "timeline-card");
    const heading = createElement("div", "timeline-heading");
    const title = createElement("h3", "", item.role || "Milestone");
    const period = createElement("span", "", item.period || "Current");
    const org = createElement("p", "", item.organization || "");
    const description = createElement("p", "", item.description || "");

    heading.appendChild(title);
    heading.appendChild(period);
    card.appendChild(heading);
    card.appendChild(org);
    card.appendChild(description);
    timelineItem.appendChild(marker);
    timelineItem.appendChild(card);
    container.appendChild(timelineItem);
  });
}

function renderAchievements() {
  const container = document.getElementById("achievement-list");
  if (!container) return;

  if (!achievements.length) {
    const placeholder = createElement("div", "achievement-card");
    placeholder.innerHTML =
      '<span class="tag">Awaiting</span><h3>Public recognition</h3><p>No publicly verified achievements have been added yet. Add them here when verified and ready to publish.</p>';
    container.appendChild(placeholder);
    return;
  }

  achievements.forEach((item) => {
    const card = createElement("article", "achievement-card");
    const tag = createElement(
      "span",
      "tag",
      item.organization || "Recognition",
    );
    const title = createElement("h3", "", item.title || "Achievement");
    const description = createElement("p", "", item.description || "");

    card.appendChild(tag);
    card.appendChild(title);
    card.appendChild(description);
    container.appendChild(card);
  });
}

function renderCurrentFocus() {
  const container = document.getElementById("focus-panel");
  if (!container) return;

  const list = createElement("ul", "focus-list");
  (currentFocus.items || []).forEach((item) => {
    list.appendChild(createElement("li", "", item));
  });

  const title = createElement(
    "h3",
    "",
    currentFocus.label || "Now / exploring",
  );
  const strong = createElement("strong", "", "Small ideas. Useful outcomes.");
  const meta = createElement(
    "p",
    "",
    currentFocus.timestamp || "Updated manually",
  );

  const left = createElement("div", "");
  left.appendChild(title);
  left.appendChild(strong);
  left.appendChild(meta);

  const right = createElement("div", "");
  right.appendChild(list);

  container.appendChild(left);
  container.appendChild(right);
}

function renderProfileImage() {
  const photoFrame = document.querySelector(".photo-placeholder");
  if (!photoFrame) return;

  const preferredImage =
    profile.profileImage ||
    profile.fallbackImage ||
    "/assets/profile-portrait.svg";
  const fallbackImage = profile.fallbackImage || "/assets/profile-portrait.svg";

  if (preferredImage) {
    const img = document.createElement("img");
    img.src = preferredImage;
    img.alt = `${profile.name || "Profile"} portrait`;
    img.className = "profile-image";
    img.onerror = () => {
      img.src = fallbackImage;
      img.onerror = () => {
        photoFrame.innerHTML = "<span>Profile photo</span>";
      };
    };
    photoFrame.innerHTML = "";
    photoFrame.appendChild(img);
  }
}

function renderContactLinks() {
  const container = document.getElementById("contact-links");
  if (!container) return;

  const socialLinks = Array.isArray(profile.socialLinks)
    ? profile.socialLinks
    : [];

  if (socialLinks.length) {
    socialLinks.forEach((link) => {
      const item = createElement("a", "contact-link", link.label || "Profile");
      if (link.url) {
        item.href = link.url;
        item.target = "_blank";
        item.rel = "noreferrer";
      } else {
        item.href = "#contact";
        item.setAttribute("aria-disabled", "true");
      }
      container.appendChild(item);
    });
  }

  const directEmail = document.getElementById("direct-email");
  if (directEmail) {
    directEmail.hidden = !profile.email;
    directEmail.href = profile.email ? `mailto:${profile.email}` : "#contact";
    directEmail.setAttribute("aria-disabled", profile.email ? "false" : "true");
  }
}

function initNavigation() {
  const header = document.querySelector(".site-header");
  const menu = document.getElementById("nav-menu");
  const toggle = document.querySelector(".nav-toggle");

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const activateLink = (sectionId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("active", isActive);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateLink(entry.target.id);
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener("scroll", () => {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!dot || !ring || window.matchMedia("(pointer: coarse)").matches) return;

  const setCursorPosition = (event) => {
    dot.classList.add("cursor-visible");
    ring.classList.add("cursor-visible");
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    ring.style.left = `${event.clientX}px`;
    ring.style.top = `${event.clientY}px`;
  };

  document.addEventListener("pointermove", setCursorPosition);
  document
    .querySelectorAll("a, button, input, textarea, .project-card, .skill-pill")
    .forEach((element) => {
      element.addEventListener("pointerenter", () =>
        document.body.classList.add("pointer-hover"),
      );
      element.addEventListener("pointerleave", () =>
        document.body.classList.remove("pointer-hover"),
      );
    });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll(".magnetic");
  if (!buttons.length || window.matchMedia("(pointer: coarse)").matches) return;

  buttons.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      button.style.transform = `translate(${offsetX * 0.12}px, ${offsetY * 0.12}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

function initHeroAnimations() {
  if (typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".site-header", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.utils.toArray(".main-title .line").forEach((line, index) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: 0.2 + index * 0.14,
      ease: "power3.out",
    });
  });

  gsap.from(
    ".hero-description, .cta-row, .scroll-cue, .status-pill, .eyebrow-slab",
    {
      opacity: 0,
      y: 24,
      stagger: 0.12,
      duration: 0.8,
      delay: 0.7,
      ease: "power3.out",
    },
  );

  gsap.utils
    .toArray(
      ".theme-item, .project-card, .timeline-item, .achievement-card, .tech-panel",
    )
    .forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        },
      );
    });
}

function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const particles = [];

  const setup = () => {
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    particles.length = 0;
    const count = Math.min(34, Math.max(20, Math.floor(rect.width / 18)));

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: 1.5 + Math.random() * 2,
      });
    }
  };

  const draw = () => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(89, 174, 23, 0.12)";
    ctx.lineWidth = 1;

    for (let i = 0; i < particles.length; i += 1) {
      const particle = particles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;

      for (let j = i + 1; j < particles.length; j += 1) {
        const sibling = particles[j];
        const dx = particle.x - sibling.x;
        const dy = particle.y - sibling.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 110) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(sibling.x, sibling.y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(89, 174, 23, 0.75)";
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  setup();
  requestAnimationFrame(draw);
  window.addEventListener("resize", setup);
}

function initForm() {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (!form || !formMessage) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = {
      name: (formData.get("name") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      subject: (formData.get("subject") || "").toString().trim(),
      message: (formData.get("message") || "").toString().trim(),
      website: (formData.get("website") || "").toString().trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.subject ||
      !payload.message
    ) {
      formMessage.textContent =
        "Please complete all form fields before submitting.";
      formMessage.className = "form-message error";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formMessage.textContent = "Sending your message...";
    formMessage.className = "form-message";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send message.");
      }

      formMessage.textContent = result.message || "Message sent successfully.";
      formMessage.className = "form-message success";
      form.reset();
    } catch (error) {
      formMessage.textContent =
        error.message || "Something went wrong while submitting.";
      formMessage.className = "form-message error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}

function initVisitNotification() {
  const button = document.getElementById("visit-notify-button");
  const status = document.getElementById("visit-notice-status");
  if (!button || !status) return;

  button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "Sending your visit notification...";
    status.className = "visit-notice-status";

    try {
      const response = await fetch("/api/contact/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: true }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send the notification.");
      }

      status.textContent = result.message || "Visit notification sent.";
      status.className = "visit-notice-status success";
    } catch (error) {
      status.textContent = error.message || "Unable to send the notification.";
      status.className = "visit-notice-status error";
      button.disabled = false;
    }
  });
}

function initSite() {
  setResumeState();
  renderSkills();
  renderInterests();
  renderProjects();
  renderExperience();
  renderAchievements();
  renderCurrentFocus();
  renderProfileImage();
  renderContactLinks();
  initNavigation();
  initCursor();
  initMagneticButtons();
  initHeroAnimations();
  initHeroCanvas();
  initForm();
  initVisitNotification();
  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", initSite);
