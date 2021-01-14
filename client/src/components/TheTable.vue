<template>
  <section class="table-section ">
    <div class="container">
      <table class="products">
        <thead>
          <tr>
            <th>
              <input type="checkbox"/>
            </th>
            <th>Название</th>
            <th>Количество(шт)</th>
            <th>Цена(руб)</th>
            <th>Дата и время добавления</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox"/>
            </td>
            <td/>
            <td/>
            <td/>
            <td/>
            <td>
              <i class="far fa-trash-alt rm-product"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style lang="scss">
.products {
  width: 100%;
  border: 0px;
  border-collapse: collapse;
  text-align: left;
  background: #fff;

  thead {
    background-color: #f0f0f0;

    th {
      padding: 5px 10px;
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #e5ecf0;
      }
    }

    td {
      padding: 15px 10px;
      border-bottom: 1px solid #e8e9eb;
    }
  }

  .rm-product {
    cursor: pointer;
  }

  .rm-product:hover {
    color: rgb(153, 18, 18);
  }

}
</style>
