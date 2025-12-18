// Skill Tree Data Structure
const skillTreeData = [
    {
        id: 1,
        name: "HTML/CSS",
        icon: "fas fa-code",
        description: "Master the building blocks of web development. Create structured, semantic HTML and style it with modern CSS.",
        levels: 5,
        position: { row: 0, col: 0 },
        requirements: [],
        unlocks: [2, 3]
    },
    {
        id: 2,
        name: "JavaScript",
        icon: "fab fa-js",
        description: "Learn the language of the web. Add interactivity and dynamic behavior to your websites.",
        levels: 5,
        position: { row: 1, col: 1 },
        requirements: [{ skillId: 1, level: 2 }],
        unlocks: [4, 5]
    },
    {
        id: 3,
        name: "Responsive Design",
        icon: "fas fa-mobile-alt",
        description: "Create websites that work beautifully on all devices from mobile to desktop.",
        levels: 5,
        position: { row: 0, col: 2 },
        requirements: [{ skillId: 1, level: 3 }],
        unlocks: [6]
    },
    {
        id: 4,
        name: "DOM Manipulation",
        icon: "fas fa-sitemap",
        description: "Master dynamically updating webpage content and structure with JavaScript.",
        levels: 5,
        position: { row: 2, col: 0 },
        requirements: [{ skillId: 2, level: 2 }],
        unlocks: [7, 8]
    },
    {
        id: 5,
        name: "API Integration",
        icon: "fas fa-cloud",
        description: "Connect your applications to external services and data sources using REST APIs.",
        levels: 5,
        position: { row: 2, col: 2 },
        requirements: [{ skillId: 2, level: 3 }],
        unlocks: [9]
    },
    {
        id: 6,
        name: "CSS Frameworks",
        icon: "fas fa-palette",
        description: "Leverage CSS frameworks like Bootstrap or Tailwind for rapid UI development.",
        levels: 5,
        position: { row: 1, col: 3 },
        requirements: [{ skillId: 3, level: 2 }],
        unlocks: [10]
    },
    {
        id: 7,
        name: "State Management",
        icon: "fas fa-brain",
        description: "Manage application state efficiently with patterns like Flux or Redux.",
        levels: 5,
        position: { row: 3, col: 0 },
        requirements: [{ skillId: 4, level: 3 }],
        unlocks: [11]
    },
    {
        id: 8,
        name: "Performance",
        icon: "fas fa-tachometer-alt",
        description: "Optimize web applications for speed and efficiency.",
        levels: 5,
        position: { row: 3, col: 1 },
        requirements: [{ skillId: 4, level: 2 }, { skillId: 5, level: 2 }],
        unlocks: [12]
    },
    {
        id: 9,
        name: "Authentication",
        icon: "fas fa-user-shield",
        description: "Implement secure user authentication and authorization systems.",
        levels: 5,
        position: { row: 3, col: 3 },
        requirements: [{ skillId: 5, level: 3 }],
        unlocks: [13]
    },
    {
        id: 10,
        name: "UI/UX Design",
        icon: "fas fa-paint-brush",
        description: "Create intuitive and visually appealing user interfaces with good UX principles.",
        levels: 5,
        position: { row: 2, col: 4 },
        requirements: [{ skillId: 6, level: 3 }],
        unlocks: [14]
    },
    {
        id: 11,
        name: "Testing",
        icon: "fas fa-vial",
        description: "Write tests to ensure your code works correctly and prevent regressions.",
        levels: 5,
        position: { row: 4, col: 0 },
        requirements: [{ skillId: 7, level: 2 }],
        unlocks: [15]
    },
    {
        id: 12,
        name: "Build Tools",
        icon: "fas fa-tools",
        description: "Use tools like Webpack, Babel, and npm to streamline development workflows.",
        levels: 5,
        position: { row: 4, col: 2 },
        requirements: [{ skillId: 8, level: 3 }],
        unlocks: [16]
    },
    {
        id: 13,
        name: "Database Basics",
        icon: "fas fa-database",
        description: "Understand database concepts and work with SQL or NoSQL databases.",
        levels: 5,
        position: { row: 4, col: 3 },
        requirements: [{ skillId: 9, level: 2 }],
        unlocks: []
    },
    {
        id: 14,
        name: "Animation",
        icon: "fas fa-film",
        description: "Create smooth animations and transitions to enhance user experience.",
        levels: 5,
        position: { row: 3, col: 4 },
        requirements: [{ skillId: 10, level: 3 }],
        unlocks: []
    },
    {
        id: 15,
        name: "TypeScript",
        icon: "fas fa-typo3",
        description: "Add static typing to JavaScript for better tooling and code reliability.",
        levels: 5,
        position: { row: 5, col: 0 },
        requirements: [{ skillId: 11, level: 3 }],
        unlocks: []
    },
    {
        id: 16,
        name: "Architecture",
        icon: "fas fa-project-diagram",
        description: "Design scalable and maintainable application architectures.",
        levels: 5,
        position: { row: 5, col: 2 },
        requirements: [{ skillId: 12, level: 4 }],
        unlocks: []
    }
];

// Skill Tree Manager
class SkillTree {
    constructor() {
        this.skills = new Map();
        this.selectedSkill = null;
        this.canvas = document.getElementById('connection-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tooltip = document.getElementById('tooltip');
        
        this.loadSkills();
        this.init();
        this.drawConnections();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    // Load skills from localStorage or initialize
    loadSkills() {
        const savedSkills = localStorage.getItem('skillTreeData');
        
        skillTreeData.forEach(skillData => {
            let skill;
            
            if (savedSkills) {
                const savedData = JSON.parse(savedSkills);
                const savedSkill = savedData.find(s => s.id === skillData.id);
                
                if (savedSkill) {
                    skill = new Skill(
                        skillData.id,
                        skillData.name,
                        skillData.icon,
                        skillData.description,
                        skillData.levels,
                        skillData.position,
                        skillData.requirements,
                        skillData.unlocks,
                        savedSkill.level
                    );
                } else {
                    skill = new Skill(
                        skillData.id,
                        skillData.name,
                        skillData.icon,
                        skillData.description,
                        skillData.levels,
                        skillData.position,
                        skillData.requirements,
                        skillData.unlocks,
                        skillData.id === 1 ? 1 : 0 // First skill starts at level 1
                    );
                }
            } else {
                skill = new Skill(
                    skillData.id,
                    skillData.name,
                    skillData.icon,
                    skillData.description,
                    skillData.levels,
                    skillData.position,
                    skillData.requirements,
                    skillData.unlocks,
                    skillData.id === 1 ? 1 : 0 // First skill starts at level 1
                );
            }
            
            this.skills.set(skill.id, skill);
        });
    }
    
    // Initialize the skill tree
    init() {
        this.renderSkillTree();
        this.updateStats();
        this.setupEventListeners();
        
        // Set canvas size
        this.handleResize();
    }
    
    // Render the skill tree grid
    renderSkillTree() {
        const treeGrid = document.getElementById('skill-tree');
        treeGrid.innerHTML = '';
        
        this.skills.forEach(skill => {
            const skillElement = skill.createDOMElement();
            
            // Add click event to upgrade skill
            skillElement.addEventListener('click', () => this.selectSkill(skill));
            
            // Add hover events for tooltip
            skillElement.addEventListener('mouseenter', (e) => this.showTooltip(e, skill));
            skillElement.addEventListener('mouseleave', () => this.hideTooltip());
            
            treeGrid.appendChild(skillElement);
            skill.element = skillElement;
        });
        
        // Update skill states after all elements are created
        this.updateSkillStates();
    }
    
    // Update UI based on skill states
    updateSkillStates() {
        this.skills.forEach(skill => {
            skill.updateState(this.skills);
        });
    }
    
    // Select a skill for upgrading
    selectSkill(skill) {
        // Don't select locked skills
        if (skill.state === 'locked') return;
        
        // Remove previous selection
        if (this.selectedSkill) {
            this.selectedSkill.element.classList.remove('selected');
        }
        
        // Set new selection
        this.selectedSkill = skill;
        skill.element.classList.add('selected');
        
        // Update skill details panel
        this.updateSkillDetails(skill);
    }
    
    // Update the skill details panel
    updateSkillDetails(skill) {
        const detailPanel = document.getElementById('skill-details');
        const noSelection = document.querySelector('.no-selection');
        
        // Show details, hide "no selection" message
        detailPanel.style.display = 'block';
        noSelection.style.display = 'none';
        
        // Update skill information
        document.getElementById('detail-name').textContent = skill.name;
        document.getElementById('detail-description').textContent = skill.description;
        document.getElementById('detail-level').textContent = skill.level;
        
        // Update level bars
        const levelBars = document.querySelectorAll('.level-bar');
        levelBars.forEach((bar, index) => {
            bar.classList.remove('active', 'maxed');
            
            if (index < skill.level) {
                bar.classList.add('active');
            }
            
            if (index < skill.level && skill.level === skill.maxLevel) {
                bar.classList.add('maxed');
            }
        });
        
        // Update requirements list
        const requirementsList = document.getElementById('requirements-list');
        requirementsList.innerHTML = '';
        
        if (skill.requirements.length > 0) {
            skill.requirements.forEach(req => {
                const requiredSkill = this.skills.get(req.skillId);
                const li = document.createElement('li');
                li.classList.add(requiredSkill.level >= req.level ? 'met' : 'unmet');
                
                li.innerHTML = `
                    <span>${requiredSkill.name} (Level ${req.level})</span>
                    <span>${requiredSkill.level >= req.level ? '✓' : '✗'}</span>
                `;
                
                requirementsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.classList.add('met');
            li.textContent = "No requirements";
            requirementsList.appendChild(li);
        }
        
        // Update upgrade button
        const upgradeBtn = document.getElementById('upgrade-btn');
        const canUpgrade = skill.canUpgrade(this.skills);
        
        upgradeBtn.disabled = !canUpgrade || skill.level >= skill.maxLevel;
        upgradeBtn.innerHTML = skill.level >= skill.maxLevel 
            ? '<i class="fas fa-check"></i> Max Level Reached' 
            : `<i class="fas fa-level-up-alt"></i> Upgrade to Level ${skill.level + 1}`;
        
        // Set upgrade button event
        upgradeBtn.onclick = () => this.upgradeSkill(skill);
    }
    
    // Upgrade a skill
    upgradeSkill(skill) {
        if (!skill.canUpgrade(this.skills) || skill.level >= skill.maxLevel) return;
        
        skill.level++;
        skill.updateState(this.skills);
        
        // Update UI
        this.updateSkillDetails(skill);
        this.updateStats();
        this.drawConnections();
        
        // Save to localStorage
        this.saveProgress();
    }
    
    // Update statistics
    updateStats() {
        let totalPoints = 0;
        let unlockedSkills = 0;
        
        this.skills.forEach(skill => {
            totalPoints += skill.level;
            if (skill.level > 0) unlockedSkills++;
        });
        
        document.getElementById('total-points').textContent = totalPoints;
        document.getElementById('unlocked-skills').textContent = `${unlockedSkills}/${this.skills.size}`;
    }
    
    // Draw connections between skills
    drawConnections() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set line style
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        
        // Draw connections between skills
        this.skills.forEach(skill => {
            if (skill.unlocks.length === 0) return;
            
            const startElement = skill.element;
            if (!startElement) return;
            
            const startRect = startElement.getBoundingClientRect();
            const treeContainerRect = document.querySelector('.tree-container').getBoundingClientRect();
            
            const startX = startRect.left + startRect.width / 2 - treeContainerRect.left;
            const startY = startRect.top + startRect.height / 2 - treeContainerRect.top;
            
            skill.unlocks.forEach(unlockId => {
                const targetSkill = this.skills.get(unlockId);
                if (!targetSkill || !targetSkill.element) return;
                
                const targetRect = targetSkill.element.getBoundingClientRect();
                const targetX = targetRect.left + targetRect.width / 2 - treeContainerRect.left;
                const targetY = targetRect.top + targetRect.height / 2 - treeContainerRect.top;
                
                // Determine line color based on skill state
                if (skill.state === 'maxed' && targetSkill.state !== 'locked') {
                    this.ctx.strokeStyle = '#f59e0b';
                } else if (skill.state === 'unlocked' && targetSkill.state !== 'locked') {
                    this.ctx.strokeStyle = '#6c63ff';
                } else {
                    this.ctx.strokeStyle = '#4a5568';
                }
                
                // Draw line
                this.ctx.beginPath();
                this.ctx.moveTo(startX, startY);
                
                // Create a curved line for visual appeal
                const controlX = (startX + targetX) / 2;
                const controlY = Math.min(startY, targetY) - 50;
                
                this.ctx.quadraticCurveTo(controlX, controlY, targetX, targetY);
                this.ctx.stroke();
                
                // Draw arrowhead
                const angle = Math.atan2(targetY - controlY, targetX - controlX);
                const arrowSize = 10;
                
                this.ctx.fillStyle = this.ctx.strokeStyle;
                this.ctx.beginPath();
                this.ctx.moveTo(targetX, targetY);
                this.ctx.lineTo(
                    targetX - arrowSize * Math.cos(angle - Math.PI / 6),
                    targetY - arrowSize * Math.sin(angle - Math.PI / 6)
                );
                this.ctx.lineTo(
                    targetX - arrowSize * Math.cos(angle + Math.PI / 6),
                    targetY - arrowSize * Math.sin(angle + Math.PI / 6)
                );
                this.ctx.closePath();
                this.ctx.fill();
            });
        });
    }
    
    // Show tooltip on hover
    showTooltip(event, skill) {
        const tooltip = this.tooltip;
        tooltip.innerHTML = `
            <h4>${skill.name}</h4>
            <p>${skill.description}</p>
            <div class="tooltip-level">Level: ${skill.level}/${skill.maxLevel}</div>
            ${skill.state === 'locked' ? '<div class="tooltip-level">🔒 Locked</div>' : ''}
        `;
        
        tooltip.style.opacity = '1';
        tooltip.style.left = `${event.pageX + 15}px`;
        tooltip.style.top = `${event.pageY + 15}px`;
    }
    
    // Hide tooltip
    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }
    
    // Handle window resize
    handleResize() {
        const treeContainer = document.querySelector('.tree-container');
        this.canvas.width = treeContainer.clientWidth;
        this.canvas.height = treeContainer.clientHeight;
        
        this.drawConnections();
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => this.resetTree());
        
        // Upgrade button
        document.getElementById('upgrade-btn').addEventListener('click', () => {
            if (this.selectedSkill) {
                this.upgradeSkill(this.selectedSkill);
            }
        });
    }
    
    // Reset the skill tree
    resetTree() {
        if (confirm("Are you sure you want to reset the skill tree? All progress will be lost.")) {
            localStorage.removeItem('skillTreeData');
            
            // Reset all skills except first one
            this.skills.forEach(skill => {
                skill.level = skill.id === 1 ? 1 : 0;
                skill.updateState(this.skills);
            });
            
            // Reset selection
            if (this.selectedSkill) {
                this.selectedSkill.element.classList.remove('selected');
                this.selectedSkill = null;
                
                // Show "no selection" message
                document.getElementById('skill-details').style.display = 'none';
                document.querySelector('.no-selection').style.display = 'block';
            }
            
            this.updateStats();
            this.drawConnections();
            this.saveProgress();
        }
    }
    
    // Save progress to localStorage
    saveProgress() {
        const skillsArray = Array.from(this.skills.values()).map(skill => ({
            id: skill.id,
            level: skill.level
        }));
        
        localStorage.setItem('skillTreeData', JSON.stringify(skillsArray));
    }
}

// Skill Class
class Skill {
    constructor(id, name, icon, description, maxLevel, position, requirements, unlocks, level = 0) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.description = description;
        this.maxLevel = maxLevel;
        this.position = position;
        this.requirements = requirements;
        this.unlocks = unlocks;
        this.level = level;
        this.state = 'locked'; // locked, unlocked, maxed
        this.element = null;
    }
    
    // Create DOM element for this skill
    createDOMElement() {
        const element = document.createElement('div');
        element.className = 'skill-node';
        element.dataset.id = this.id;
        
        // Position based on grid
        element.style.gridRow = this.position.row + 1;
        element.style.gridColumn = this.position.col + 1;
        
        element.innerHTML = `
            <div class="skill-icon">${this.getIconHTML()}</div>
            <div class="skill-name">${this.name}</div>
            <div class="skill-level">${this.level}</div>
        `;
        
        return element;
    }
    
    // Get icon HTML with level-based color
    getIconHTML() {
        if (this.level === 0) {
            return `<i class="${this.icon}" style="color: #718096;"></i>`;
        } else if (this.level === this.maxLevel) {
            return `<i class="${this.icon}" style="color: #f59e0b;"></i>`;
        } else {
            return `<i class="${this.icon}" style="color: #6c63ff;"></i>`;
        }
    }
    
    // Update skill state based on requirements
    updateState(allSkills) {
        // Determine if skill is unlocked
        const requirementsMet = this.requirements.every(req => {
            const requiredSkill = allSkills.get(req.skillId);
            return requiredSkill && requiredSkill.level >= req.level;
        });
        
        // Update state
        if (this.level === 0 && !requirementsMet) {
            this.state = 'locked';
        } else if (this.level === 0 && requirementsMet) {
            this.state = 'unlocked';
        } else if (this.level > 0 && this.level < this.maxLevel) {
            this.state = 'unlocked';
        } else if (this.level === this.maxLevel) {
            this.state = 'maxed';
        }
        
        // Update UI if element exists
        if (this.element) {
            this.element.className = 'skill-node';
            this.element.classList.add(this.state);
            
            // Update level display
            const levelElement = this.element.querySelector('.skill-level');
            if (levelElement) {
                levelElement.textContent = this.level;
            }
            
            // Update icon color
            const iconElement = this.element.querySelector('.skill-icon');
            if (iconElement) {
                iconElement.innerHTML = this.getIconHTML();
            }
        }
    }
    
    // Check if skill can be upgraded
    canUpgrade(allSkills) {
        // Check if already at max level
        if (this.level >= this.maxLevel) return false;
        
        // Check if requirements are met
        const requirementsMet = this.requirements.every(req => {
            const requiredSkill = allSkills.get(req.skillId);
            return requiredSkill && requiredSkill.level >= req.level;
        });
        
        // First skill can always be upgraded if not maxed
        if (this.id === 1) return true;
        
        return requirementsMet && this.level > 0;
    }
}

// Initialize the skill tree when page loads
document.addEventListener('DOMContentLoaded', () => {
    const skillTree = new SkillTree();
    
    // Select the first skill by default
    const firstSkill = skillTree.skills.get(1);
    if (firstSkill) {
        skillTree.selectSkill(firstSkill);
    }
});