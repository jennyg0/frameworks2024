import Link from "next/link";

// TODO: update data
const projects = [
  { id: "1", name: "Project One" },
  { id: "2", name: "Project Two" },
];

export default function AllCampaignsComponent() {
  return (
    <div>
      <h1>Current Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/campaigns/${project.id}`}>
              <div>{project.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
