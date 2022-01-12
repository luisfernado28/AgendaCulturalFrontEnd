/** @jsxImportSource theme-ui */

import { Spinner } from 'theme-ui'

function PageSpinner(): JSX.Element {
  return (
    <div
      sx={{
        alignItems: 'center',
        height: '85%',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        zIndex: 9,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Spinner sx={{ color: 'orange' }} />
    </div>
  )
}

export default PageSpinner
