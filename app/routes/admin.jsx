import { Outlet, Link, useLoaderData } from "remix";

import { getPosts } from "~/post";
import adminStyles from "~/styles/admin.css";
import NewPost from "./admin/new";

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
        <h1>Admin Panel</h1>
        <p>Click on a post to edit.</p>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={"edit/" + post.slug}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <p>Create a New Post</p>
        <ul>
          <li><Link to="new">New Post</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}