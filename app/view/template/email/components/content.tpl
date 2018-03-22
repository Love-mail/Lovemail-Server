{% macro generate(temp, data) %}
  {{data|dump}}
  {% if temp === "1" %}
    <table data-module="module-one" data-thumb="{{data.imgUrl}}" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td data-bgcolor="bg-module" bgcolor="#eaeced">
          <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
            <tr>
              <td class="img-flex"><img src="{{data.imgUrl}}" style="vertical-align:top;" width="600" height="306" alt="" /></td>
            </tr>
            <tr>
              <td data-bgcolor="bg-block" class="holder" style="padding:58px 60px 52px;" bgcolor="#f9f9f9">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td data-color="title" data-size="size title" data-min="25" data-max="45" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:26px/38px Arial, Helvetica, sans-serif; color:#444; padding:0 0 24px;">
                      {{data.nickname}}和你在一起的第 <span style="font-size:35px;color:#D14243;">{{data.loveTimeInterval}}</span> 天
                    </td>
                  </tr>
                  <tr>
                      <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:400 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;">
                        今天你那儿{{data.stateDetailed}}哦，{{data.tem1}}° - {{data.tem2}}°。无论你身处何方，我都会陪着你，到永远
                      </td>
                    </tr>
                  <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:blod; text-decoration:underline; color:#40aceb;" align="left" style="font:400 18px/28px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;">
                      <h1 style="margin:0;color:#888;">“</h1>
                      {{data.oneMsg}}
                      <h1 style="float:right;margin:18px 0 0 0;color:#888;">”</h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td height="28"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  {% endif %}
  {% if temp === "2" %}
    <table data-module="module-essay" data-thumb="{{data.imgUrl}}" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td data-bgcolor="bg-module" bgcolor="#eaeced">
          <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
            <tr>
              <td class="img-flex"><img src="{{data.imgUrl}}" style="vertical-align:top;" width="600" height="249" alt="" /></td>
            </tr>
            <tr>
              <td data-bgcolor="bg-block" class="holder" style="padding:65px 60px 50px;" bgcolor="#f9f9f9">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td data-color="title" data-size="size title" data-min="20" data-max="40" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:30px/33px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                      {{data.essay_title}}
                    </td>
                  </tr>
                  <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:16px/33px Arial, Helvetica, sans-serif; color:#666; padding:0 0 24px;">
                      {{data.essay_author}}
                    </td>
                  </tr>
                  <tr>
                    <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="left" style="font:16px/29px Arial, Helvetica, sans-serif; color:#888; padding:0 0 21px;">
                      {{data.essay_content|safe}}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td height="28"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  {% endif %}
{% endmacro %}
