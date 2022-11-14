import WithAuth from "../common/hoc/withAuth"
import Layout from "../common/components/templates/default"

const ProtectedPage = () => {


    return <Layout title="protected page" className="h-screen">
        <div>
            <h1>Protected page, only with login</h1>
        </div>
    </Layout>
}

export default WithAuth(ProtectedPage)