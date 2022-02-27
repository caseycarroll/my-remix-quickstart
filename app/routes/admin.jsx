import { Outlet, Link, useLoaderData } from "remix";

import { getPosts } from "~/post";
import adminStyles from "~/styles/admin.css";
import AdminIndex from "./admin";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = async () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <p>Click on a post to edit.</p>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}