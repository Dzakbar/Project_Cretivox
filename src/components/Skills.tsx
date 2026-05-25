const skills = [
  { name: "MySQL", orbit: "skills__item--html" },
  { name: "Critical Thinking", orbit: "skills__item--css" },
  { name: "JavaScript", orbit: "skills__item--javascript" },
  { name: "React", orbit: "skills__item--react" },
  { name: "Next.js", orbit: "skills__item--next" },
  { name: "AI Tools", orbit: "skills__item--gsap" },
  { name: "UI/UX", orbit: "skills__item--uiux" },
  { name: "GitHub", orbit: "skills__item--animation" },
];

export function Skills() {
  return (
    <div className="skills__content">
      <p className="skills__label">apa yang aku bisa</p>
      <ul className="skills__list" aria-label="Skills">
        {skills.map((skill) => (
          <li className={`skills__item ${skill.orbit}`} key={skill.name}>
            <button className="skills__button" type="button">
              {skill.name}
            </button>
          </li>
        ))}
      </ul>
      <p className="skills__outro">tapi ini bukan satu-satunya hal tentang aku.</p>
    </div>
  );
}
