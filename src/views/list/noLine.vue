<template>
  <Page>
    <Header>
      <Navbar>
        <Title>NoLine</Title>
      </Navbar>
    </Header>
    <Content>
      <List no-lines>
        <Item button v-for="item in list">
          {{item}}
        </Item>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        list: [
          'NoLine 1',
          'NoLine 2',
          'NoLine 3',
          'NoLine 4',
          'NoLine 5',
          'NoLine 6',
          'NoLine 7',
          'NoLine 8',
          'NoLine 9',
          'NoLine 10',
          'NoLine 11',
          'NoLine 12',
          'NoLine 13',
          'NoLine 14',
        ]
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>
