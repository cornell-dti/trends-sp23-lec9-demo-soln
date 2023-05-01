import { Button, Heading, Spinner, VStack } from "@chakra-ui/react"
import { useAuth } from "../components/auth/AuthUserProvider"
import Frodo from "../components/frodo/Frodo"
import Layout from "../components/layout/Layout"
import { signInWithGoogle, signOut } from "../util/firebase"

const FrodoHeading = () => (
  <Heading
    as="h1"
    w="fit-content"
    bgGradient="linear(to-r, cyan.700, purple.500)"
    bgClip="text"
    lineHeight={1.33}
  >
    Frodo: My Todo List
  </Heading>
)

const FrodoPage = () => {
  const { user, loading } = useAuth()
  return (
    <Layout title="Frodo">
      <VStack spacing={4}>
        <FrodoHeading />
        {loading ? <Spinner /> : user ? <Frodo /> : <></>}
        <Button
          _focusVisible={{ shadow: "outline" }}
          _focus={{ shadow: "none" }}
          colorScheme={"facebook"}
          onClick={user ? signOut : signInWithGoogle}
        >
          {user ? "Sign Out" : "Sign In"}
        </Button>
      </VStack>
    </Layout>
  )
}

export default FrodoPage
