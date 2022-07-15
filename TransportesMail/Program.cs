using MailKit;
using MailKit.Net.Imap;

namespace TransportesMail
{
    class Program
    {
        static void Main(string[] args)
        {
            Program program = new Program();

            //program.GetFolders();
            program.GetMessages();

            //RecuperaCarpetas();

            Console.WriteLine("Hello World!");
            Console.ReadLine();
        }

        async void GetFolders()
        {
            string emaiAddress = "transportes.test@outlook.com";//"transportes.test@gmail.com";
            string emailPassword = "Prueba.123";//"Prueba.123";
            string hostname = "outlook.office365.com";//"imap.gmail.com";
            int port = 993;
            bool ssl = true;

            List<string> list = new List<string>();

            using (ImapClient iClient = new ImapClient())
            {
                iClient.Connect(hostname, port, ssl);
                iClient.Authenticate(emaiAddress, emailPassword);

                var folders = await iClient.GetFoldersAsync(new FolderNamespace('.', ""));

                foreach (var item in folders)
                {
                    list.Add(item.FullName);
                }

                iClient.Disconnect(true);
            }
        }

        public async void GetMessages()
        {
            //string emaiAddress = "transportes.test@outlook.com";//"transportes.test@gmail.com";
            //string emailPassword = "Prueba.123";//"Prueba.123";
            //string hostname = "outlook.office365.com";//"imap.gmail.com";
            //int port = 993;
            //bool ssl = true;

            string emaiAddress = "transportes.test@gmail.com";
            string emailPassword = "iclklpheuakslzmk";
            string hostname = "imap.gmail.com";
            int port = 993;
            bool ssl = true;

            //emailPassword = new System.Net.NetworkCredential(string.Empty, emailPassword).Password;

            using (ImapClient iClient = new ImapClient())
            {
                iClient.Connect(hostname, port, ssl);
                iClient.Authenticate(emaiAddress, emailPassword);

                var folder = await iClient.GetFolderAsync("Inbox");

                await folder.OpenAsync(FolderAccess.ReadOnly);

                List<EmailListData> emailList = new List<EmailListData>();

                foreach (var item in folder)
                {
                    emailList.Add(new EmailListData() { Id = item.MessageId, Subject = item.Subject, HtmlBody = item.HtmlBody, TextBody = item.TextBody });
                }

                var x = emailList.Count();

                iClient.Disconnect(true);
            }
        }

        public async void ProcessMessages()
        {
            string emaiAddress = "transportes.test@gmail.com";
            string emailPassword = "iclklpheuakslzmk";
            string hostname = "imap.gmail.com";
            int port = 993;
            bool ssl = true;

            //emailPassword = new System.Net.NetworkCredential(string.Empty, emailPassword).Password;

            using (ImapClient iClient = new ImapClient())
            {
                //Conexion 
                iClient.Connect(hostname, port, ssl);
                //Autenticacion
                iClient.Authenticate(emaiAddress, emailPassword);

                //Obtiene todas las carpetas de la cuenta
                var folders = await iClient.GetFoldersAsync(new FolderNamespace('.', ""));

                foreach (var item in folders)
                {
                    var folder = await iClient.GetFolderAsync(item.FullName);

                    await folder.OpenAsync(FolderAccess.ReadOnly);

                    List<EmailListData> emailList = new List<EmailListData>();

                    foreach (var mess in folder)
                    {
                        emailList.Add(new EmailListData() { Id = mess.MessageId, Subject = mess.Subject, HtmlBody = mess.HtmlBody, TextBody = mess.TextBody });
                    }
                }

                iClient.Disconnect(true);
            }
        }

    }

    public class EmailListData
    {
        public string Id { get; set; }
        public string Subject { get; set; }
        public string? HtmlBody { get; set; }
        public string TextBody { get; set; }
    }

    public class SolicitudData
    {
        public string OrdenServicio { get; set; }
        public string Cliente { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
    }

}


//// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");
//Console.ReadLine();