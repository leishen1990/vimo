<template>
  <Page>
    <Header>
      <Navbar>
        <Title>组件</Title>
      </Navbar>
    </Header>
    <Content :useIScroll="true">
      <List>
        <!--基础组件-->
        <ListHeader>
          基础组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'app'}">
            <Icon slot="left" name="browsers" :isActive="true"></Icon>
            整体 (App)
          </Item>
          <Item button :to="{name: 'content'}">
            <Icon slot="left" name="chatboxes" :isActive="true"></Icon>
            布局 (Header/Content/Footer)
          </Item>
          <Item button :to="{name: 'toolbar'}">
            <Icon slot="left" name="briefcase" :isActive="true"></Icon>
            工具条 (Toolbar)
          </Item>
        </ItemGroup>

        <!--通用组件-->
        <ListHeader>通用组件</ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'button'}">Button</Item>
          <Item button :to="{name: 'icon'}">Icon</Item>
          <Item button :to="{name: 'spinner'}">Spinner</Item>
          <Item button :to="{name: 'list'}">List</Item>
          <Item button :to="{name: 'searchbar'}">Searchbar</Item>
          <Item button :to="{name: 'tabs'}">Tabs</Item>
          <Item button :to="{name: 'segment'}">Segment</Item>
          <Item button :to="{name: 'input'}">Input</Item>
          <Item button :to="{name: 'grid'}">Grid</Item>
          <Item button :to="{name: 'cards'}">Cards</Item>
          <Item button :to="{name: 'fab'}">Fab</Item>
        </ItemGroup>

        <!--弹出层组件-->
        <ListHeader>
          弹出层组件
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'actionSheet'}">ActionSheet</Item>
          <Item button :to="{name: 'alert'}">Alert</Item>
          <Item button :to="{name: 'toast'}">Toast</Item>
          <Item button :to="{name: 'backdrop'}">Backdrop</Item>
          <Item button :to="{name: 'loading'}">Loading</Item>
          <Item button :to="{name: 'modal'}">Modal</Item>
        </ItemGroup>

        <!--弹出层组件-->
        <ListHeader>
          Demo
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item button :to="{name: 'demo'}">Demo</Item>
        </ItemGroup>


      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'name',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>
