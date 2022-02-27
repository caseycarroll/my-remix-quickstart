import {
    useTransition,
    useActionData,
    useLoaderData,  
    Form,
    redirect,
} from "remix";
import { createPost, getPost } from "~/post";
import invariant from "tiny-invariant";

export const action = async ({ request }) => {

    const formData = await request.formData();

    const title = formData.get("title")
    const slug = formData.get("slug")
    console.log("test", slug)
    const markdown = formData.get("markdown")

    const errors = {};
    if (!title) errors.title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;

    if (Object.keys(errors).length) {
        return errors;
    }

    invariant(typeof title === "string");
    invariant(typeof slug === "string");
    invariant(typeof markdown === "string");
    await createPost({ title, slug, markdown })

    return redirect("/admin")
}

export const loader = async ({
    params,
}) => {
    invariant(params.edit, "expected params.edit");
    return getPost(params.edit);
};

export default function AdminEditSlug() {
    const post = useLoaderData()
    const errors = useActionData();
    const transition = useTransition();

    return (
        <div>
            <h2>Edit Blog: {post.title}</h2>
            <Form method="post">
                <p>
                    <label>
                        Post Title:{" "}
                        {errors?.title ? (
                            <em>Title is required</em>
                        ) : null}
                        <input type="text" name="title" defaultValue={post.title} />
                    </label>
                </p>
                <p>
                    <label>
                        Post Slug:{" "}
                        {errors?.slug ? <em>Slug is required</em> : null}
                        <input readOnly="readonly" type="text" name="slug" defaultValue={post.slug} />
                    </label>
                </p>
                <p>
                    <label htmlFor="markdown">Markdown:</label>{" "}
                    {errors?.markdown ? (
                        <em>Markdown is required</em>
                    ) : null}
                    <br />
                    <textarea key={post.slug} id="markdown" rows={20} cols={50} name="markdown" defaultValue={post.markdown}/>
                </p>
                <p>
                    <button type="submit">
                        {transition.submission
                            ? "Updating..."
                            : "Update Post"}
                    </button>
                </p>
            </Form>
        </div>
    );
}