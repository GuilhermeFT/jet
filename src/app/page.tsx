import { getAllProjects } from '@/services/projects'

export default async function Home() {
  const projects = await getAllProjects()

  return (
    <main>
      {projects?.values.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </main>
  )
}
