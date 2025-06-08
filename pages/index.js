import Link from "next/link";
import { bells } from "../data/bells";
import { slugify } from "../lib/slugify";

export default function Home() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Bells Test Links</h1>
      <ul>
        {bells.map(bell => (
          <li key={bell.id}>
            <Link href={`/bells/${slugify(bell.title)}`}>
              {bell.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
