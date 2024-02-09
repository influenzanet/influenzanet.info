// @ts-ignore
import { Box, BoxProps, Button, FormGroup, H5, Input, Label, MessageBox, Text, H2, Illustration} from '@adminjs/design-system'
// @ts-ignore
import { styled, ThemeProvider } from '@adminjs/design-system/styled-components'
// @ts-ignore
import React, {FC} from 'react'
import { useSelector } from 'react-redux'
import { LoginTemplateAttributes } from "adminjs/types/src/frontend/login-template";
import { ReduxState, useTranslation } from "adminjs";
// @ts-ignore
import { combineStyles } from "@adminjs/design-system";


const myTheme = combineStyles({
  colors: {
    primary100: '#00898a',
    bg: '#F0F3F6',
    accent: '#003556',
  }
})

const Wrapper = styled(Box)<BoxProps>`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`

const IllustrationsWrapper = styled(Box)<BoxProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  & svg [stroke='#3B3552'] { stroke: rgba(0, 53, 86, 0.5); }
  & svg [fill='#3040D6'] { fill: rgba(0, 53, 86, 1); }
`

const StyledLogo = styled.img`
  max-width: 200px;
  margin: ${({ theme }) => theme.space.md} 0;
`

export type LoginProps = {
  message?: string
  action: string
}

export const Login: FC = () => {
  const props = (window as any).__APP_STATE__ as LoginTemplateAttributes
  const { action, errorMessage: message } = props
  const { translateComponent, translateMessage } = useTranslation()
  const branding = useSelector((state: ReduxState) => state.branding)
  const state = useSelector((state: ReduxState) => state)

  console.log('state', state)

  return (
    <ThemeProvider theme={myTheme}>
      <Wrapper flex variant="grey" className="login__Wrapper">
        <Box bg="white" height="440px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
          <Box
            bg="primary100"
            color="accent"
            p="x3"
            width="380px"
            flexGrow={0}
            display={['none', 'none', 'block']}
            position="relative"
          >
            <H2 fontWeight="lighter" color="accent">{translateComponent('Login.welcomeHeader')}</H2>
            <Text fontWeight="lighter" mt="default">
              {translateComponent('Login.welcomeMessage')}
            </Text>
            <IllustrationsWrapper p="xxl">
              <Box display="inline" mr="default">
                <Illustration variant="Planet" width={82} height={91} />
              </Box>
              <Box display="inline">
                <Illustration variant="Astronaut" width={82} height={91}/>
              </Box>
              <Box display="inline" position="relative" top="-20px">
                <Illustration variant="FlagInCog" width={82} height={91} />
              </Box>
            </IllustrationsWrapper>
          </Box>
          <Box
            as="form"
            action={action}
            method="POST"
            p="x3"
            flexGrow={1}
            width={['100%', '100%', '480px']}
          >
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
              <H5 marginBottom="xxl">
                {branding.logo ? (
                  <StyledLogo src={branding.logo} alt={branding.companyName} />
                ) : (
                  branding.companyName
                )}
              </H5>
              {message && (
                <MessageBox
                  my="lg"
                  message={message.split(' ').length > 1 ? message : translateMessage(message)}
                  variant="danger"
                />
              )}
            </div>
            <FormGroup>
              <Label required>{translateComponent('Login.properties.email')}</Label>
              <Input name="email" placeholder={translateComponent('Login.properties.email')} />
            </FormGroup>
            <FormGroup>
              <Label required>{translateComponent('Login.properties.password')}</Label>
              <Input
                type="password"
                name="password"
                placeholder={translateComponent('Login.properties.password')}
                autoComplete="new-password"
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button variant="contained">{translateComponent('Login.loginButton')}</Button>
            </Text>
          </Box>
        </Box>
      </Wrapper>
    </ThemeProvider>
  )
}

export default Login
