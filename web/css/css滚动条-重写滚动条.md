# css重写滚动条样式
```
<style>
    .box {
        width: 150px;
        height: 200px;
        overflow-x: hidden;
        overflow-y: scroll;
        margin: 100px;
        background: #ddd;
    }

    /*滚动条整体样式*/
    .box::-webkit-scrollbar {
      width: 5px;
    }

    /*滚动条滑块*/
    .box::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(50, 50, 50, 0.3);
    }

    .box::-webkit-scrollbar-thumb:hover {
      background-color: rgba(50, 50, 50, 0.4);
    }

    /*滚动条轨道*/
    .box::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: rgba(50, 50, 50, 0.1);
    }

    .box::-webkit-scrollbar-track:hover {
      background-color: rgba(50, 50, 50, 0.2);
    }
</style>
<div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
    <div>13</div>
    <div>14</div>
    <div>15</div>
    <div>16</div>
    <div>17</div>
    <div>18</div>
    <div>19</div>
    <div>20</div>
    <div>21</div>
    <div>22</div>
    <div>23</div>
    <div>24</div>
    <div>25</div>
    <div>26</div>
    <div>27</div>
    <div>28</div>
    <div>29</div>
    <div>30</div>
</div>
```
