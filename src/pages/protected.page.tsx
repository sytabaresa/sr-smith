import WithAuth from "@hoc/withAuth"
import Layout from "@components/templates/default"

export { Protected as Page }


const ProtectedPage = () => {


    return <Layout title="protected page" className="h-screen">
        <div>
            <h1>Protected page, only with login</h1>
        </div>
    </Layout>
}
const Protected = WithAuth(ProtectedPage)
