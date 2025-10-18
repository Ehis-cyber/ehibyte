// Professional CV content for EhiByte
const cvData = {
    personalInfo: {
        name: "EhiByte",
        title: "Full Stack Developer",
        email: "okontaehijesumuan@gmail.com",
        phone: "+234 808 846 9442",
        website: "hitmeupafrica.com",
        location: "Nigeria"
    },
    
    summary: "Creative Full Stack Developer with expertise in modern web technologies. Passionate about creating stunning, user-friendly websites and applications. Specializes in React, Node.js, and modern JavaScript frameworks with a focus on delivering exceptional user experiences.",
    
    skills: {
        frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Vue.js", "SASS/SCSS", "Tailwind CSS", "Responsive Design", "Three.js", "GSAP"],
        backend: ["Node.js", "Express.js", "Python", "PHP", "RESTful APIs", "GraphQL", "Microservices"],
        database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
        tools: ["Git", "Docker", "AWS", "Google Cloud", "CI/CD", "Webpack", "Vite"]
    },
    
    experience: [
        {
            title: "Full Stack Developer",
            company: "HitMeUpAfrica",
            period: "2022 - Present",
            achievements: [
                "Developed and maintained the main platform (hitmeupafrica.com)",
                "Implemented responsive designs for optimal user experience across all devices",
                "Built real-time messaging features using WebSocket technology",
                "Optimized application performance resulting in 40% faster load times",
                "Collaborated with cross-functional teams to deliver high-quality products"
            ]
        }
    ],
    
    projects: [
        {
            name: "HitMeUpAfrica Platform",
            url: "hitmeupafrica.com",
            description: "Comprehensive social platform connecting people across Africa",
            technologies: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
            features: ["User authentication", "Real-time messaging", "Responsive design", "Social features"]
        },
        {
            name: "Interactive Portfolio Website",
            description: "Creative portfolio with 3D animations and interactive elements",
            technologies: ["HTML5", "CSS3", "JavaScript", "Three.js", "GSAP", "Particles.js"],
            features: ["3D animations", "Particle effects", "Responsive design", "Interactive elements"]
        }
    ],
    
    education: [
        {
            degree: "Computer Science / Software Engineering",
            institution: "[Your Institution]",
            year: "[Year]"
        }
    ],
    
    certifications: [
        "JavaScript Algorithms and Data Structures",
        "Responsive Web Design",
        "Full Stack Development",
        "Modern React Development"
    ]
};

// Generate professional CV in HTML format for better formatting
function generateProfessionalCV() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cvData.personalInfo.name} - CV</title>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #8B5CF6; padding-bottom: 20px; }
        .name { font-size: 2.5em; font-weight: bold; color: #8B5CF6; margin-bottom: 5px; }
        .title { font-size: 1.3em; color: #666; margin-bottom: 15px; }
        .contact-info { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; }
        .contact-item { color: #666; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 1.4em; font-weight: bold; color: #8B5CF6; border-bottom: 2px solid #F472B6; padding-bottom: 5px; margin-bottom: 15px; }
        .job-title { font-weight: bold; color: #333; }
        .company { color: #8B5CF6; font-weight: bold; }
        .period { color: #666; font-style: italic; }
        .achievement { margin-left: 20px; margin-bottom: 5px; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .skill-category { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #8B5CF6; }
        .skill-category-title { font-weight: bold; color: #8B5CF6; margin-bottom: 10px; }
        .project { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .project-name { font-weight: bold; color: #8B5CF6; font-size: 1.1em; }
        .project-url { color: #F472B6; text-decoration: none; }
        .tech-tags { margin-top: 10px; }
        .tech-tag { display: inline-block; background: #8B5CF6; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.8em; margin-right: 5px; margin-bottom: 5px; }
        @media print { body { padding: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${cvData.personalInfo.name}</div>
        <div class="title">${cvData.personalInfo.title}</div>
        <div class="contact-info">
            <div class="contact-item">📧 ${cvData.personalInfo.email}</div>
            <div class="contact-item">📞 ${cvData.personalInfo.phone}</div>
            <div class="contact-item">🌐 ${cvData.personalInfo.website}</div>
            <div class="contact-item">📍 ${cvData.personalInfo.location}</div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>${cvData.summary}</p>
    </div>

    <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
            <div class="skill-category">
                <div class="skill-category-title">Frontend Technologies</div>
                ${cvData.skills.frontend.map(skill => `<div class="tech-tag">${skill}</div>`).join('')}
            </div>
            <div class="skill-category">
                <div class="skill-category-title">Backend Technologies</div>
                ${cvData.skills.backend.map(skill => `<div class="tech-tag">${skill}</div>`).join('')}
            </div>
            <div class="skill-category">
                <div class="skill-category-title">Database & Cloud</div>
                ${cvData.skills.database.map(skill => `<div class="tech-tag">${skill}</div>`).join('')}
            </div>
            <div class="skill-category">
                <div class="skill-category-title">Tools & Technologies</div>
                ${cvData.skills.tools.map(skill => `<div class="tech-tag">${skill}</div>`).join('')}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Work Experience</div>
        ${cvData.experience.map(job => `
            <div style="margin-bottom: 20px;">
                <div class="job-title">${job.title}</div>
                <div><span class="company">${job.company}</span> | <span class="period">${job.period}</span></div>
                ${job.achievements.map(achievement => `<div class="achievement">• ${achievement}</div>`).join('')}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">Featured Projects</div>
        ${cvData.projects.map(project => `
            <div class="project">
                <div class="project-name">${project.name}</div>
                ${project.url ? `<div><a href="https://${project.url}" class="project-url">${project.url}</a></div>` : ''}
                <div style="margin-top: 8px;">${project.description}</div>
                ${project.features ? `<div style="margin-top: 8px;"><strong>Features:</strong> ${project.features.join(', ')}</div>` : ''}
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        ${cvData.education.map(edu => `
            <div style="margin-bottom: 10px;">
                <div class="job-title">${edu.degree}</div>
                <div><span class="company">${edu.institution}</span> | <span class="period">${edu.year}</span></div>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">Certifications</div>
        ${cvData.certifications.map(cert => `<div class="achievement">• ${cert}</div>`).join('')}
    </div>

    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
        <small>Generated from EhiByte Portfolio | Contact: ${cvData.personalInfo.email}</small>
    </div>
</body>
</html>`;
}

// Export CV data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cvData, generateProfessionalCV };
}