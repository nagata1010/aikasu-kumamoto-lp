function doPost(e) {
  try {
    var data = e.parameter;
    var company = data.company || '';
    var position = data.position || '';
    var fullname = data.fullname || '';
    var email = data.email || '';
    var phone = data.phone || '';
    var meetingDates = data.meeting_dates || '';
    var message = data.message || '';

    var recipients = [
      'info@aikasu.jp',
      'abe.keisuke@aikasu.jp',
      'kamijima.nanami@aikasu.jp'
    ];

    var subject = '【熊本合同入社式LP】お問い合わせ：' + company + ' ' + fullname + '様';
    var body = '━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
      + '  熊本合同入社式×新入社員研修 お問い合わせ\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
      + '■ 企業名\n' + company + '\n\n'
      + '■ お役職\n' + (position || '（未入力）') + '\n\n'
      + '■ お名前\n' + fullname + '\n\n'
      + '■ メールアドレス\n' + email + '\n\n'
      + '■ 電話番号\n' + phone + '\n\n'
      + '■ お打ち合わせ候補日\n' + meetingDates + '\n\n'
      + '■ その他ご質問・ご要望\n' + (message || '（未入力）') + '\n\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
      + '※ このメールはLPのお問い合わせフォームから自動送信されています。\n'
      + '※ 2営業日以内にご返信をお願いします。\n';

    recipients.forEach(function(to) {
      MailApp.sendEmail({ to: to, subject: subject, body: body, replyTo: email });
    });

    var autoReplySubject = '【株式会社AIKASU】お問い合わせありがとうございます';
    var autoReplyBody = fullname + ' 様\n\nこの度はお問い合わせいただき、誠にありがとうございます。\n以下の内容で受け付けいたしました。\n\n企業名：' + company + '\nお名前：' + fullname + '\nお打ち合わせ候補日：\n' + meetingDates + '\n\n担当者より2営業日以内にご連絡いたします。\n今しばらくお待ちくださいませ。\n\n株式会社AIKASU\ninfo@aikasu.jp\n';

    MailApp.sendEmail({ to: email, subject: autoReplySubject, body: autoReplyBody, name: '株式会社AIKASU' });

    return ContentService.createTextOutput('OK');
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}
