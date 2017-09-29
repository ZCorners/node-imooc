$(function () {
    $('.comment').click(function (e) {
        var target = $(this)
        var tid = target.data('tid')
        var cid = target.data('cid')

        if ($('#tid').length > 0) {
            $('#tid').val(tid)
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'tid',
                name: 'comment[tid]',
                value: tid
            }).appendTo('#commentForm')
        }

        if ($('#cid').length > 0) {
            $('#cid').val(cid)
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'cid',
                name: 'comment[cid]',
                value: cid
            }).appendTo('#commentForm')
        }
    })
})