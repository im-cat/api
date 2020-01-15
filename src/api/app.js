import container from './container'

const app = container.resolve('application')

app
  .start()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit()
  })
