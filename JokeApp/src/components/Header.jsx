import {Flex} from '@mantine/core'

function Header() {
    return (<>
    <Flex 
    mih={50}
    justify="center"
    align="center"
    direction="row"
    style={{
        position: "fixed",
        top: 0,
        left: 20
    }}
    >
    <h2>DataArt Winter IT Camp 2025</h2>
    </Flex>
    </> );
}

export default Header;