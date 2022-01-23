import WithAuth from "../components/hoc/withAuth"
import Layout from "../components/templates"

const ProtectedPage = () => {


    return <Layout title="protected page" className="h-screen">
        <div>
            <h1>Protected page, only with login</h1>
        </div>
    </Layout>
}

export default WithAuth(ProtectedPage)